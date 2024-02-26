import { Fragment, useEffect, useState } from 'react';
import { Firm } from '../../services/investors/types';
import { investorsServiceManager } from '../../services';
import Table from './InvestorsTable';
import Spinner from '../Common/Spinner/Spinner';

const InvestorsList: React.FC = () => {
    const [investorList, setInvestorList] = useState<Firm[]>([]);
    const [isInvestorsListLoading, setIsInvestorsListLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        setIsError(false);
        setIsInvestorsListLoading(true);
        investorsServiceManager
            .getInvestors()
            .then((investorListData) => setInvestorList(investorListData))
            .catch((error) => {
                setIsError(true);
            })
            .finally(() => {
                setIsInvestorsListLoading(false);
            });
    }, []);

    return (
        <Fragment>
            {isInvestorsListLoading && <Spinner />}
            <h2>Investors</h2>
            {!isError && <Table data={investorList} />}
            {isError && <p>Some error occurred. Please try again after some time.</p>}
        </Fragment>
    );
};

export default InvestorsList;
