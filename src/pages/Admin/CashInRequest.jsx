import { useGetRequestQuery } from '../../redux/Features/rechargeRequest/rechargeRequestApi';

const CashInRequest = () => {
    const {data}=useGetRequestQuery()
    console.log(data);
    return (
        <div>
            
        </div>
    );
};

export default CashInRequest;