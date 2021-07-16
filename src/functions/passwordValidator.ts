export function passwordValidator(password: string): boolean {
  try {
    const countString = password.length;
    let returnFunction = true;

    if (countString < 6) {
      returnFunction = false;
    }

    // verificar se a string tem numero
    const regex = /[0-9]/;
    if (!regex.test(password)) {
      returnFunction = false;
    }

    // verificar se a string tem letra Maiuscula

    let contMinusculo = 0;
    let contMaiusculo = 0;
    for (let i = 0; i < password.length; i++) {

      if (!regex.test(password[i])) {
        if (password[i] == password[i].toUpperCase()) {
          contMaiusculo++
        }
        if (password[i] == password[i].toLowerCase()) {
          contMinusculo++
        }
      }

    }

    if(contMinusculo == 0 || contMaiusculo == 0 ){
      returnFunction = false;
    }





    return returnFunction;

  } catch (error) {
    return false
  }

}