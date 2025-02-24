import { useSelector } from "react-redux";



const useUser = () => {
    const userInfo = useSelector((state) => state?.auth?.user);

    
    return userInfo
    
};

export default useUser;