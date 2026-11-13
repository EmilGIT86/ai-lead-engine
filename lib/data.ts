export type Lead = {id:number;name:string;industry:string;signal:string;score:number;status:string;value:string;source:string};
export const industries = ['Staffing & Outsourcing','Digital Marketing','Roofing','HVAC','Cleaning','Real Estate','Credit Repair'];
export const leads:Lead[] = [
{id:1,name:'Northstar Commerce',industry:'Staffing & Outsourcing',signal:'Hiring 14 customer support agents',score:96,status:'New',value:'$12,000/mo',source:'Job posting'},
{id:2,name:'Atlas Software',industry:'Staffing & Outsourcing',signal:'Expanding support coverage to 24/7',score:89,status:'Qualified',value:'$8,000/mo',source:'Company announcement'},
{id:3,name:'Brightline Retail',industry:'Staffing & Outsourcing',signal:'Customer support team expansion',score:76,status:'Contacted',value:'$5,000/mo',source:'Job posting'},
{id:4,name:'Studio Grove',industry:'Digital Marketing',signal:'New location launch; no local landing page',score:91,status:'New',value:'$3,500',source:'Business announcement'},
{id:5,name:'Summit Property Group',industry:'Roofing',signal:'Requested storm-damage roof inspection',score:93,status:'Qualified',value:'$9,000',source:'Inbound inquiry'},
{id:6,name:'Westside Offices',industry:'HVAC',signal:'Requested replacement AC quotes',score:88,status:'New',value:'$6,500',source:'Inbound inquiry'},
{id:7,name:'Urban Stay Homes',industry:'Cleaning',signal:'Adding four short-term rental units',score:85,status:'Contacted',value:'$2,000/mo',source:'Business announcement'},
{id:8,name:'Cedar Homes',industry:'Real Estate',signal:'Relocation buyer consultation request',score:80,status:'New',value:'TBD',source:'Inbound inquiry'},
{id:9,name:'Sample Inquiry',industry:'Credit Repair',signal:'Requested credit education consultation',score:71,status:'New',value:'TBD',source:'Inbound inquiry'}
];