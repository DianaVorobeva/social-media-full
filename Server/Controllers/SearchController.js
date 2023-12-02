import UserModel from "../Models/userModel.js";



// get array of users match the query

export const getSearchArray = async (req, res) => {
    try {
        let text = req.params.text;
       
        let reg = ".*" + text + ".*";
       
        let searchArray = await UserModel.find({$or:[
            {
                username: {
                    $regex: reg,
                    $options: 'i'
                  }
            },
            {
            firstname: {
              $regex: reg,
              $options: 'i'
            }
          },
          {lastname: {
            $regex: reg,
            $options: 'i'
          }}
        ]})
        

      
        res.status(200).json(searchArray);
    } catch (error) {
        res.status(500).json(error);
    }
}