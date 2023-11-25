import { create } from 'zustand';
import { demoData } from './demoData';

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
  curve: {},
};

type Parameter = {
  id: number;
  label: string;
  default_value: string;
  default_unit: string;
  data_type: string;
  description: string;
  options: string[];
  curve: object;
};

type Component = {
  id: number;
  name: string;
  category: string;
  cad: string;
  icon: string;
  description: string;
  inputs: Parameter[];
  parameters: Parameter[];
  outputs: Parameter[];
};

type Components = {
  components: Component[];
  defaultComponent: Component;
  setComponentsData: (componentData: any) => void;
  newComponent: (componentData: Component) => void;
  addInput: (componentId: number, input: Parameter) => void;
};

const useStore = create<Components>((set) => ({
  components: demoData,
  setComponentsData: (componentsData: any) => set({ components: componentsData }, false),
  addNewComponent: () => {
    set((state) => ({
      components: [...state.components, { ...defaultComponent, id: state.components.length }],
    }));
  },
  addParam: (parameter_type: string, componentId: number) => {
    set((state) => {
      const newComponents = [...state.components];
      const newParameter = {
        ...defaultParameter,
        id: newComponents[componentId][parameter_type].length,
      };
      newComponents[componentId][parameter_type].push(newParameter);
      return { components: [...newComponents] };
    });
  },
}));

export default useStore;
