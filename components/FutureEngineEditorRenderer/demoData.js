const demoData = [
  {
    id: 0,
    name: 'bldc motor',
    category: 'Electromechanical',
    cad: '',
    icon: 'Motor',
    description:
      'A Brushless DC (BLDC) motor is a type of electric motor that uses magnetically driven rotation, employing electronic commutation instead of brushes for improved efficiency, reliability, and reduced maintenance.',
    parameters: [
      {
        label: 'Width',
        data_type: 'number',
        default_value: 1000,
        default_unit: 'mm',
        description: 'width description',
        isInput: true,
        isOutput: true,
      },
      {
        label: 'Height',
        data_type: 'number',
        default_value: 500,
        default_unit: 'mm',
        description: 'height description',
        isInput: true,
        isOutput: true,
      },
      {
        label: 'Mounting Type',
        data_type: 'string',
        description: 'How the motor is mounted',
        isInput: true,
        isOutput: true,
      },
      {
        label: 'Include Encoder Type',
        data_type: 'boolean',
        description: 'is encoder included in this',
        isInput: true,
        isOutput: true,
      },
      {
        label: 'Model',
        data_type: 'datasheet',
        description: 'BLDC Model Number',
        options: ['Model 1', 'Model 2', 'Model 3', 'Model 4', 'Model 5'],
        datasheets: [0, 1]
      },
      {
        label: 'motor kV value',
        data_type: 'option',
        description: 'Motor kV',
        options: ['100', '200', '300'],
        isInput: true
      },
      {
        label: 'torque curve',
        data_type: 'table',
        description: 'motor torque curve',
        table: [
          {
            rpm: 0,
            torque: 1000,
            efficiency: 0.75
          },
          {
            rpm: 1000,
            torque: 750,
            efficiency: 0.65
          },
          {
            rpm: 2000,
            torque: 200,
            efficiency: 0.50
          }
        ]
      }
    ],
    outputs: [
      {
        label: 'Torque',
        data_type: 'number',
        default_value: 1000,
        default_unit: 'kg',
        description: 'weight description',
        formula: 'test formula',
      },
      {
        label: 'Power',
        data_type: 'number',
        default_value: 500,
        default_unit: 'W',
        description: 'power description',
        formula: 'test formula2',
      },
    ],
  },
  {
    id: 1,
    name: 'numbers tester',
    category: 'Numbers',
    cad: '',
    icon: 'Numbers',
    description: 'numbers description',
    parameters: [
      {
        label: 'Width',
        data_type: 'number',
        default_value: 1000,
        default_unit: 'mm',
        description: 'width description'
      },
      {
        label: 'Height',
        data_type: 'number',
        default_value: 500,
        default_unit: 'mm',
        description: 'height description'
      },
      {
        label: 'Include Encoder Type',
        data_type: 'boolean',
        description: 'is encoder included in this'
      }
    ],
    outputs: [
      {
        label: 'Power',
        data_type: 'number',
        default_value: 500,
        default_unit: 'W',
        description: 'power description',
        formula: 'test formula2'
      }
    ]
  }
]

const datasheets = [
  {
    id: 0,
    name: 'Model 1',
    description: 'Model 1 description',
    category: 'Electromechanical',
    manufactureModelNumber: 'M1FADA',
    manufacture: 'Future Motion',
    parameters: [
      {
        label: 'Shaft Length',
        data_type: 'number',
        value: 1000,
        unit: 'mm',
        description: 'width description'
      },
      {
        label: 'Shaft Diameter',
        data_type: 'number',
        value: 500,
        unit: 'mm',
        description: 'diameter description'
      },
      {
        label: 'max rpm',
        data_type: 'number',
        value: 500,
        unit: 'rpm',
        description: 'max rpm description'
      }
    ],
  },
  {
    id: 1,
    name: 'Model 2',
    description: 'Model 2 description',
    category: 'Electromechanical',
    manufactureModelNumber: 'M2FADA',
    manufacture: 'Future Motion',
    parameters: [
      {
        label: 'Shaft Length',
        data_type: 'number',
        value: 5000,
        unit: 'mm',
        description: 'width description'
      },
      {
        label: 'Shaft Diameter',
        data_type: 'number',
        value: 600,
        unit: 'mm',
        description: 'diameter description'
      },
      {
        label: 'max rpm',
        data_type: 'number',
        value: 700,
        unit: 'rpm',
        description: 'max rpm description'
      }
    ],
  }
]
export { demoData, datasheets }