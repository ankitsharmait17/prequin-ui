import { Fragment, useEffect, useState } from 'react';
import { Firm } from '../../services/investors/types';
import { investorsServiceManager } from '../../services';
import Table from './Table';
import Spinner from '../Common/Spinner';

const InvestorsList: React.FC = () => {
    const [investorList, setInvestorList] = useState<Firm[]>([]);
    const [isInvestorsListLoading, setInvestorsListLoading] = useState<boolean>(false);

    useEffect(() => {
        setInvestorsListLoading(true);
        investorsServiceManager
            .getInvestors()
            .then((investorListData) => setInvestorList(investorListData))
            .finally(() => {
                setInvestorsListLoading(false);
            });
    }, []);

    return (
        <Fragment>
            {isInvestorsListLoading && <Spinner />}
            <h2>Investors</h2>
            <Table data={investorList} />
        </Fragment>
    );
};

export default InvestorsList;
