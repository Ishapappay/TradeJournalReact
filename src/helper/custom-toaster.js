import toast from 'react-hot-toast';

const customToaster = {
        success :(message)=>{
            toast.success(message,{
                position:"bottom-right"
            });
        },
        error:(message)=>{
            toast.error(message,{
                position:'bottom-right'
            })
        },
        warning:(message)=>{
            toast.warning(message,{
                position:'bottom-right'
            })
        }
}

export default customToaster;