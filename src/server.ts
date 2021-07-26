import app from "./app";
import '../src/database';


const port = 3333
app.listen(port, () => {
    console.log('server on port ' + port + '');
})






