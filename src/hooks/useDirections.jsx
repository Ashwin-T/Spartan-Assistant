const useDirections= async() => {

    if(window.innerWidth < 768){
        return true;
    }
    return false;
}
 
export default useDirections;