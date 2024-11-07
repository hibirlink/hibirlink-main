import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "_hibirlink_data",
  state: () => {
    return {
      realtime_service_category: [],
      virtual_service_category: [],
      virtual_product_category: [],
      physical_product_category: [],
      physical_product_subcategory: [],
      sub_city: [],
      region_city: [],
    };
  },
  actions: {
    setRealTimeServiceCategory(newValue: any) {
      this.realtime_service_category = newValue;
    },
    setVirtualServiceCategory(newValue: any) {
      this.virtual_service_category = newValue;
    },
    setVirtualProductCategory(newValue: any) {
      this.virtual_product_category = newValue;
    },
    setSubCity(newValue: any) {
      this.sub_city = newValue;
    },
    setRegionCity(newValue: any) {
      this.region_city = newValue;
    },
    setPhysicalProductCategory(newValue: any) {
      this.physical_product_category = newValue;
    },
    setPhysicalProductSubCategory(newValue: any) {
      this.physical_product_subcategory = newValue;
    },
  },
  getters: {
    getVirtualServiceCategory(state) {
      return (lang: any) =>
        state.virtual_service_category.map((element) => {
          return {
            id: element?.id,
            logo: element?.logo,
            name: element.name?.filter((value) => {
              return value.type === lang;
            }),
          };
        });
    },

    getRealTimeServiceCategory(state) {
      return (lang: any) =>
        state.realtime_service_category.map((element: any) => {
          return {
            id: element.id,
            logo: element?.logo,
            name: element?.name?.filter((value) => {
              return value.type === lang;
            }),
          };
        });
    },

    getPhysicalProductCategory(state) {
      return (lang: any) =>
        state.physical_product_category.map((element) => {
          return {
            id: element?.id,
            logo: element?.logo,
            name: element.name?.filter((value) => {
              return value.type === lang;
            }),
          };
        });
    },
    getPhysicalProductSubCategory(state) {
      return (lang: any) =>
        state.physical_product_subcategory.map((element) => {
          return {
            id: element?.id,
            logo: element?.logo,
            category_id: element?.category_id,
            name: element.name?.filter((value) => {
              return value.type === lang;
            }),
          };
        });
    },
    getPhysicalProductSubCategoryByCategory(state) {
      return (lang: any, cat_id: any) => {
        let state_local = state.physical_product_subcategory.map((element) => {
          return {
            id: element?.id,
            logo: element?.logo,
            category_id: element?.category_id,
            name: element.name?.filter((value) => {
              return value.type === lang;
            }),
          };
        });

        return state_local.filter((element) => {
          return element.category_id == cat_id;
        });
      };
    },

    getVirtualProductCategory(state) {
      return (lang: any) => {
        return state.virtual_product_category?.map((element: any) => {
          return {
            id: element?.id,
            logo: element?.logo,
            name: element?.name?.find((value: any) => {
              return value?.type == lang;
            }),
          };
        });
      };
    },
  },
});
