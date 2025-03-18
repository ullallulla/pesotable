import PrintModel from "./printmodel";
import User from "./user";

User.hasMany(PrintModel)
PrintModel.belongsTo(User)
PrintModel.sync({alter: true})
User.sync({alter:true})

export default { User, PrintModel }