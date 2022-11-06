import web3 from './web3';

const address = '0x70bdA140581DCF84F90044Df617cACa67665F3D8';

const abi = [
{
    inputs: [ [Object] ],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined,
    signature: 'constructor'
  },
  {
    inputs: [ [Object] ],
    name: 'addTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x67238562'
  },
  {
    inputs: [],
    name: 'listCount',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x1b68d10d'
  },
  {
    inputs: [ [Object] ],
    name: 'markCompleted',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0xcac5c512'
  },
  {
    inputs: [ [Object] ],
    name: 'taskList',
    outputs: [ [Object], [Object], [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x2a1c52a5'
  }
];

 export default new web3.eth.Contract(abi, address);