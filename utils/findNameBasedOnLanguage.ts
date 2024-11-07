export default function(names,language)
{


 return names.find((name:any)=>{


return name.type== language;

 })
}