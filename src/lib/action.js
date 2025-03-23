
"use server"
import { redirect } from "next/dist/server/api-utils";
import { addUser, editUser, getData } from "./storage";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === "";
  }

export async function actionAddUser(prevState, formData) {
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      isEditing: formData.get("isEditing"),
      id: formData.get("id")
    }
    console.log(user)
    if(isInvalidText(user.name) || isInvalidText(user.email)) {
      return {
        message: "Invalid input.",

      };
    }
    if(user.isEditing == "true") {
        await editUser(user)
        console.log(1)
    }
    if(user.isEditing == "false") {
        await addUser(user);
        console.log(2)
    }
    
    revalidatePath("/");
   
    return {
        message: "Yeeppii",

    };
    

  }