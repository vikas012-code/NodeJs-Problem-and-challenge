const fs = require("fs")
const readline = require("readline")
const crypto = require("crypto")


const read=readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const DataOfDataBase={
    UserName:[],
    PassWord:[]
}

read.question("Do you Want to Login Enter Y(Yes) otherwise N(No) for Registration :",(LoginOrnot)=>{
    if(LoginOrnot.length>0){
        if(LoginOrnot.toLowerCase()==="n"){
            read.question("For Register \nEnter your Username :",(Username)=>{
                if(Username.length>=4){
                    read.question("Enter your Password :",(Password)=>{
                        if(Password.length>=4){
                            const hashPassword=crypto.createHash("sha256").update(Password).digest("hex")
                            fs.appendFile("./DataBase.txt",`Username=${Username} Password=${hashPassword} `,((err)=>{
                            if(err) return err
                            console.log("Saved Login successfully")
                        }))
                        }
                        read.close()
                    })
                }

            })
        }
        else{
            read.question("For Login \nEnter your Username :",(Username)=>{
                if(Username.length>=4){
                    read.question("Enter your Password :",(Password)=>{
                        if(Password.length>=4){
                            const hashPassword=crypto.createHash("sha256").update(Password).digest("hex")
                            fs.readFile("./DataBase.txt","utf-8",(err ,data)=>{
                                if(err) return console.log(err) 
                                  
                                const ArrOfData=data.split(" ")
                                const SingleArrOfData=ArrOfData.map((data)=> data.split("="))


                                for(let i=0;i<SingleArrOfData.length-1;i++){

                                    if(SingleArrOfData[i][0]==="Username"){
                                        DataOfDataBase["UserName"].push(SingleArrOfData[i][1])
                                    }

                                    if(SingleArrOfData[i][0]==="Password"){
                                        DataOfDataBase["PassWord"].push(SingleArrOfData[i][1])
                                    }

                                } 
                                
                                for(let i=0;i<DataOfDataBase.UserName.length;i++){

                                    if(DataOfDataBase["UserName"][i]===Username){

                                        for(let i=0;i<DataOfDataBase.PassWord.length;i++){

                                            if(DataOfDataBase["PassWord"][i]===hashPassword){

                                                console.log("Logged In Successfully")
                                                read.close()
                                                return

                                            }
                                        }
                                    }
                                    
                                }

                                console.log("Password Or Username is Incorrect")
                                read.close()
                            })
                        }
                        
                    })
                }

            })

            // fs.readFile("./DataBase.txt","utf-8",(err ,data)=>{
            //     if(err) return console.log(err) 

            //     console.log(data)  
                
            //     const ArrOfData=data.split(" ")
            //     // console.log(ArrOfData)
            //     // console.log(ArrOfData.length)
            
            //     const SingleArrOfData=ArrOfData.map((data)=> data.split("="))

            //     // console.log(newdata)

            //     for(let i=0;i<SingleArrOfData.length-1;i++){
            //         if(SingleArrOfData[i][0]==="Username"){
            //             DataOfDataBase["UserName"].push(newdata[i][1])
            //         }
            //         if(SingleArrOfData[i][0]==="Password"){
            //             DataOfDataBase["PassWord"].push(newdata[i][1])
            //         }
            //     }  
            // })
            // read.close()
        }
    }
})




// fs.writeFile("./newText.txt","data 1 \ndata 2",((err)=>{
//     if(err) return err

//     console.log("file written successfully")

// }))

