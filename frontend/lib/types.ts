export type ServerMessage = {
  id:String; 
  senderId:String;
  body: string;      
  createdAT: string;
  conversationId: string;
}

export type ClientMessage = {
  message:String;
  senderId?:String;
  type: "message"|"date";      
  createdAT: string;
  day?: string,
}

export type User = {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  gender: "male" | "female";
};

export type Conversation ={
  id: string;
  name?: string;
  createdAT: Date;
  updateAt: Date;
  participatonIds: string[];
  messageIds: string[];
}

export type AuthUser = {
  id: string;
  userName: string;
  fullName: string;
  profileImageSrc: string;
};

export type loginUser = {
  userName: string;
  password: string;
}

export type ApiError = {
  message: string | {
    error: any;
    text: string;
  };
}