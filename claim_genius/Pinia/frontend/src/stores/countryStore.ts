import { defineStore } from "pinia";
import { ref, onMounted } from 'vue';
import Data from '@/assets/data.json';

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
  

//get country, state, cities data
  export const useDataStore = defineStore('dataStore', {
    state: () => {
      const data = Data as Data[];
      const countryData = data.find(item => item.country)?.country || [];
      const stateData = data.find(item => item.states)?.states || [];
      const CityData = data.find(item => item.cities)?.cities || [];
      return {
        country: countryData,
        states: stateData,
        cities: CityData,
        selectedCountry: '',
        selectedState: '',
        selectedCity: '',
      };
    },
    getters: {
      countryNames: (state) => state.country.map((country) => country.name),
      getCountries: (state) => state.country,
      getStatesByCountry: (state) => (countryCode: string) =>
        state.states.filter((states) => states.countryCode === countryCode),
      getCitiesByState: (state) => (stateCode: string) => 
        state.cities.filter((cities) => cities.stateCode === stateCode),
    },
    actions: {
        setSelectedCountry(countryCode: string) {
          this.selectedCountry = countryCode;
        },
        setSelectedState(stateCode: string) {
          this.selectedState = stateCode;
        },
        setSelectedCity(cityCode: string) {
          this.selectedCity = cityCode;
        },
    },
});  




//get input store
export const useInputStore = defineStore('inputStore', () => {
  const inputValue = ref('');

  const setInputValue = (value: string) => {
    inputValue.value = value;
  };

  return {
    inputValue,
    setInputValue
  };
});





export const useFileStore = defineStore('fileStore', {
  state: () => ({
    file: null as File | null,
    fileUrl: '' as string,
    fileName: '' as string,
  }),
  actions: {
    setFile(file: File) {
      this.file = file;
      this.fileUrl = URL.createObjectURL(file);
      this.fileName = file.name;
    },
    clearFile() {
      if (this.file) {
        URL.revokeObjectURL(this.fileUrl);
      }
      this.file = null;
      this.fileUrl = '';
      this.fileName = '';
    },
  },
});







//get image
export const useImageStore = defineStore('getImageStore', () => {
  const image = ref<{ id: number, url: string }[]>([]);

  const fetchImages = async () => {
    try {
      const response = await fetch('src/assets/images.json');
      image.value = await response.json();
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  onMounted(() => {
    fetchImages();
  });

  return {
    image,
    fetchImages
  };
});