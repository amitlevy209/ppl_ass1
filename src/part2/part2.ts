import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
const vowels = "aeiouAEIOU";
export const isVowel = (s: string) : boolean => vowels.includes(s);//aid function

export const countVowels: (str : string)=> number = (s : string): number => {
    const counter   = R.pipe(((s:string) => stringToArray(s)),
                             (arr : string[])=> arr.filter(isVowel),
                              (arr2: string[])=> arr2.length);
    return counter(s);
}

/* Question 2 */

export const isOpen=(s:string): boolean=>["(","[","{"].includes(s);//aid function
export const isMatch=(str:string, str2:string):boolean=>["()","[]","{}"].includes(str+str2);//aid function
//check if the string is a pair
export const addToString=(char:string,acc:string):string=>isOpen(char)? acc+char:  
                                                            (acc.length==0? acc+char :
                                                            (isMatch(char,acc.slice(-1))? acc.slice(0,acc.length-1):
                                                            acc+char));//aid function
export const isPaired:(str:string)=> boolean = (s:string): boolean =>{
    const arr:string[]=stringToArray(s)
    const parenthesesArr:string[]=arr.filter((x:string)=>["(", ")", "[", "]", "{", "}"].includes(x))
    const openP:string=parenthesesArr.reduce((acc, char) => parenthesesArr.includes(char)? isMatch(acc.slice(-1), char)? acc.slice(0,-1): acc + char: acc + char,"");
    return openP.length===0

}

/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence : (tree:WordTree)=>string = (t:WordTree):string => {
    if (t.children.length === 0) {
        return t.root;
    } 
    else return t.root + " " + R.map(treeToSentence, t.children).join(" ");
}