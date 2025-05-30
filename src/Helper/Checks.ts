export function queryIsEmpty({users, tasks}:{
  users?:string;
  tasks?:string;
}){

    if (
        users == null || users?.length === 0 || tasks == null || tasks?.length === 0
    ) {
        return true;
    }
    return false;
}