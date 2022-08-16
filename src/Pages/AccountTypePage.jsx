import React from 'react'
import ShipperAccountType from './ShipperAccountType';
import CarrierAccountType from './CarrierAccountType';
import { useLocation} from 'react-router-dom';

const AccountTypePage = () => {
    
    const {state} = useLocation();
    return (
        <div>
            {
                state.Selectedtype==='carrier' &&
                <CarrierAccountType/>
            }
            {
                state.Selectedtype==='shipper' &&
                <ShipperAccountType/>
            }
        </div>
    )
}

export default AccountTypePage
