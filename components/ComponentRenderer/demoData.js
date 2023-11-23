const demoData = [
  {
    id: 0,
    name: 'bldc motor',
    category: 'Electromechanical',
    cad: '',
    icon: 'Motor',
    description:
      'A Brushless DC (BLDC) motor is a type of electric motor that uses magnetically driven rotation, employing electronic commutation instead of brushes for improved efficiency, reliability, and reduced maintenance.',
    inputs: [
      {
        label: 'Width',
        parameter_type: 'number',
        default_value: 1000,
        default_unit: 'mm',
        description: 'width description',
      },
      {
        label: 'Height',
        parameter_type: 'number',
        default_value: 500,
        default_unit: 'mm',
        description: 'height description',
      },
    ],
    parameters: [
      {
        label: 'Mounting Type',
        parameter_type: 'string',
        description: 'How the motor is mounted',
      },
      {
        label: 'Include Encoder Type',
        parameter_type: 'boolean',
        description: 'is encoder included in this',
      },
      {
        label: 'Model',
        parameter_type: 'option',
        description: 'BLDC Model Number',
        options: ['Model 1', 'Model 2', 'Model 3', 'Model 4', 'Model 5'],
      },
      {
        label: 'motor kV value',
        parameter_type: 'option',
        description: 'Motor kV',
        options: ['100', '200', '300'],
      },
    ],
    outputs: [
      {
        label: 'Torque',
        parameter_type: 'number',
        default_value: 1000,
        default_unit: 'kg',
        description: 'weight description',
        formula: 'test formula',
      },
      {
        label: 'Power',
        parameter_type: 'number',
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
    inputs: [
      {
        label: 'Width',
        parameter_type: 'number',
        default_value: 1000,
        default_unit: 'mm',
        description: 'width description'
      },
      {
        label: 'Height',
        parameter_type: 'number',
        default_value: 500,
        default_unit: 'mm',
        description: 'height description'
      }
    ],
    parameters: [
      {
        label: 'Include Encoder Type',
        parameter_type: 'boolean',
        description: 'is encoder included in this'
      }
    ],
    outputs: [
      {
        label: 'Power',
        parameter_type: 'number',
        default_value: 500,
        default_unit: 'W',
        description: 'power description',
        formula: 'test formula2'
      }
    ]
  }
]
export { demoData }