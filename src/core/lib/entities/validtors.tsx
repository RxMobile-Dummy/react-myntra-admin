export const isEmpty = (value: any) => {
    return value.trim() === "";
  };

export const isPhone = (value : number) => {
    if(value > 11 || value < 9){
        return;
    }
}

export const isEmail = (value: any) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log("Email value is", emailRegex.test(value))
    return emailRegex.test(value);
};