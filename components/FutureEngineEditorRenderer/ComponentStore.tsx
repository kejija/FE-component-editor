import { create } from 'zustand';
import { demoData, datasheets } from './demoData';

const defaultComponent = {
  name: 'New Component',
  category: 'New Category',
  cad: 'New CAD',
  icon: 'New Icon',
  description: 'New Description',
  inputs: [],
  parameters: [],
  outputs: [],
};

const defaultParameter = {
  id: -1,
  label: 'New Parameter',
  default_value: '0',
  default_unit: 'mm',
  data_type: 'number',
  description: 'New Description',
  options: [],
  table: [],
};

type Parameter = {
  id: number;
  label: string;
  default_value: string;
  default_unit: string;
  data_type: string;
  description: string;
  options: string[];
  table: object[];
  datasheets: object[];
};

type Component = {
  id: number;
  name: string;
  category: string;
  cad: string;
  icon: string;
  description: string;
  // inputs: Parameter[];
  parameters: Parameter[];
  outputs: Parameter[];
};

type FEData = {
  components: Component[];
  datasheets: Parameter[];
  setComponentsData: (componentData: any) => void;
  addNewComponent: (componentData: Component) => void;
  addParam: (componentId: number, parameter_type: string) => void;
  deleteParameter: (componentId: number, parameter_type: string, parameterId: number) => void;
  updateComponent: (componentId: number, updateJSON: JSON) => void;
  updateParameter: (
    componentId: number,
    parameter_type: string,
    parameterId: number,
    updateJSON: JSON
  ) => void;
};

const useStore = create<FEData>((set) => ({
  DBcomponents: demoData as Component[],
  DBdatasheets: datasheets as Parameter[],
  setComponentsData: (componentsData: Component) => set({ DBcomponents: componentsData }, false),
  addNewComponent: () => {
    set((state) => ({
      components: [...state.DBcomponents, { ...defaultComponent, id: state.DBcomponents.length }],
    }));
  },
  addParam: (parameter_type: string, componentId: number) => {
    set((state) => {
      const newComponents = [...state.DBcomponents];
      const newParameter = {
        ...defaultParameter,
        id: newComponents[componentId][parameter_type].length,
      };
      newComponents[componentId][parameter_type].push(newParameter);
      return { DBcomponents: [...newComponents] };
    });
  },
  deleteParameter: (componentId: number, parameter_type: string, parameterId: number) => {
    set((state) => {
      const newComponents = [...state.DBcomponents];
      newComponents[componentId][parameter_type].splice(parameterId, 1);
      return { DBcomponents: [...newComponents] };
    });
  },
  updateComponent: (componentId: number, updateJSON: JSON) => {
    set((state) => {
      const newComponents = [...state.DBcomponents];
      console.log(componentId, updateJSON);
      newComponents[componentId] = { ...newComponents[componentId], ...updateJSON };
      return { DBcomponents: [...newComponents] };
    });
  },
  updateParameter: (
    componentId: number,
    parameter_type: string,
    parameterId: number,
    updateJSON: JSON
  ) => {
    set((state) => {
      const newComponents = [...state.DBcomponents];
      newComponents[componentId][parameter_type][parameterId] = {
        ...newComponents[componentId][parameter_type][parameterId],
        ...updateJSON,
      };
      return { DBcomponents: [...newComponents] };
    });
  },
}));

export default useStore;
