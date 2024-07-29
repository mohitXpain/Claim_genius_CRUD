import { Request, Response } from "express";
import path from 'path';
import fs from 'fs';

interface Country {
    countryCode: string;
    name: string;
}

interface State {
    stateCode: string;
    countryCode: string;
    name: string;
}

interface City {
    cityCode: string;
    stateCode: string;
    name: string;
  }
    
interface Data {
  country?: Country[];
  states?: State[];
  cities?: City[];
}


export const getdata = (req: Request, res: Response) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'data.json'), 'utf8'));
    res.json(data);
};


export const getCountry = async (req: Request, res: Response) => {
        try {
            const countries : Data[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'data.json'), 'utf8'));
    
            const countriesArray = countries[0]?.country;

            if (!Array.isArray(countriesArray)) {
                throw new Error('Country data is not an array');
            }
    
            const countryNames = countriesArray.map((country: { name: string }) => {
                if (typeof country.name !== 'string') {
                    throw new Error('Invalid country data');
                }
                return country.name;
            });
            
            res.json(countryNames);
    
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching countries:", error.message);
                return res.status(500).json({ error: "Failed to fetch countries: " + error.message });
            } else {
                console.error("Unknown error during fetching countries");
                return res.status(500).json({ error: "Failed to fetch countries with an unknown error" });
            }
        }
    };



export const getStates = async (req: Request, res: Response) => {
    const countryCode = req.query.countryCode as string;
    
        if (!countryCode) {
            return res.status(400).json({ error: "Country code is required" });
        }
    
        try {

            const jsonData : Data[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'data.json'), 'utf8'));
    
        const countryData = jsonData.find(item => item.country);
        const statesData = jsonData.find(item => item.states);

        if (!countryData || !statesData) {
            return res.status(404).json({ error: "Data not found with country and states" });
        }

        const countries = countryData.country || [];
        const states = statesData.states || [];


        const countryObject = countries.find(c => c.countryCode === countryCode);

        if (!countryObject) {
            return res.status(404).json({ error: "Country not found" });
        }

        const filteredStates = states
            .filter(state => state.countryCode === countryCode)
            .map(state => state.name);

        if (filteredStates.length === 0) {
            return res.status(404).json({ error: "No states found for the provided country code" });
        }

        res.json(filteredStates);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching states:", error.message);
            return res.status(500).json({ error: "Failed to fetch states: " + error.message });
        }
    }
};



export const getCities =  async (req: Request, res: Response) => {
    const stateCode = req.query.stateCode as string;

    if(!stateCode){
        return res.status(400).json({error: "State code is required" })
    }
    try {
        const data : Data[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'data.json'), 'utf8'));

        const statesData = data.find(item => item.states);
        const citiesData = data.find(item => item.cities);

        if (!statesData || !citiesData) {
            return res.status(404).json({ error: "Data not found with country and states" });
        }

        const states = statesData.states || [];
        const cities = citiesData.cities || [];

        const stateObject = states.find(s => s.stateCode === stateCode);

        if(!stateObject){
            return res.status(404).json({ error: "Country not found" });
        }

        const filteredCities = cities.filter(cities => cities.stateCode === stateCode).map(cities => cities.name);

        if (filteredCities.length === 0) {
            return res.status(404).json({ error: "No states found for the provided country code" });
        }

        res.json(filteredCities);

    }catch(error){
        if (error instanceof Error) {
            console.error("Error fetching states:", error.message);
            return res.status(500).json({ error: "Failed to fetch states: " + error.message });
        }
    }
};
