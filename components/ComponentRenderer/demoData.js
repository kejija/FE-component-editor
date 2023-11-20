const demoData = [
  {
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
        name: 'Mounting Type',
        type: 'string',
        description: 'How the motor is mounted',
      },
      {
        name: 'Include Encoder Type',
        type: 'boolean',
        description: 'is encoder included in this',
      },
      {
        name: 'Model',
        type: 'option',
        description: 'BLDC Model Number',
        options: ['Model 1', 'Model 2', 'Model 3', 'Model 4', 'Model 5'],
      },
      {
        name: 'motor kV value',
        type: 'option',
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
        name: 'Include Encoder Type',
        type: 'boolean',
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