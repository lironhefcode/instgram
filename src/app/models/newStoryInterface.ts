import { ByUserIntreface } from "./byUserInterface";
import { comentInterface } from "./comentInerface";

export interface newStory{

    txt:string,
    imgUrl:string,
     by:ByUserIntreface,
    comments:comentInterface[],
    likedBy:ByUserIntreface[],
}