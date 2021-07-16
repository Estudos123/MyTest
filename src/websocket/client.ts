import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";


io.on("connect", (socket) => {

  const connectionsService = new ConnectionsService();
  const userService = new UsersService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;

    if(!text && !email){
      throw new Error('Testando erro');
    }


    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      const user = await userService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })
    }else{
      await connectionsService.create({
        socket_id,
        user_id: userExists.id
      })
    }









  })
});




