exports.apiTest = async (req,res)=>{
    try {
        const data = await fetch("https://trefle.io/api/v1/plants/search?token=ldW5Nc8PDRpKhwODJVSjowd1joYknpmaq5-Lqad_h-U&q=coconut")
        const response = await data.json()
        console.log(response);
        res.status(200).send("ok")
    } catch (error) {
        res.send(error)
    }
}