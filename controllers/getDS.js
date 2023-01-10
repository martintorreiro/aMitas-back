const getDS = require("../db/getDS");
const exampleSheet = require("../users-example.json");

const getDataSheet = async (req, res, next) => {
  const clientDSrequired = req.params.datasheet;
  let response;

  try {
    if (clientDSrequired === "example") {
      response = exampleSheet;
    } else {
      const getDSResponse = await getDS(clientDSrequired);

      response = getDSResponse.dataSheet; 3

      response.usuarios = getDSResponse.dataUsers.reduce((acc, current) => {
        const exist = acc.findIndex((el) => el.nombre === current.name);
        
        console.log(exist)
        if(!exist){
         
          acc[exist].conceptos.push({concepto:current.concept, importe:current.amount})
          console.log("acc",acc)
          return acc
        }else{
          return [
            ...acc,
            {
              nombre: current.name,
              conceptos: current.concept?[
                { concepto: current.concept, importe: current.amount },
              ]:[]
            },
          ]; 
        }
        /*  return exist
          ? [...acc]
          : [
              ...acc,
              {
                nombre: current.name,
                conceptos: [
                  { concepto: current.concept, importe: current.amount },
                ],
              },
            ]; */
      }, []); 
      console.log("->", response);
    }

    res.send({
      status: "ok",
      message: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getDataSheet;
