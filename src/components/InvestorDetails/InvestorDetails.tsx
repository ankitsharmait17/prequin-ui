import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ASSET_CLASSES } from '../../constants';
import { investorsServiceManager } from '../../services';
import { Commitment } from '../../services/investors/types';
import CommitmentsTable from './CommitmentsTable';
import Spinner from '../Common/Spinner/Spinner';

const InvestorDetails: React.FC = () => {
    let { investorId } = useParams();
    const [commitmentsList, setCommitmentsList] = useState<Commitment[]>([]);
    const [isCommitmentsLoading, setCommitmentsLoading] = useState<boolean>(false);

    const fetchCommitmentDetails = (selectedAsset: string) => {
        if (selectedAsset?.length && investorId?.length) {
            setCommitmentsLoading(true);
            investorsServiceManager
                .getCommitments({ asset_class: selectedAsset, investor_id: parseInt(investorId) })
                .then((commitmentsData) => {
                    setCommitmentsList(commitmentsData);
                })
                .finally(() => {
                    setCommitmentsLoading(false);
                });
        } else {
            setCommitmentsList([]);
        }
    };

    const handleSelectedAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        fetchCommitmentDetails(event.target.value);
    };

    return (
        <Fragment>
            <div>
                <Link to={'/'}>Investors {'>'} </Link> Investor #{investorId}
            </div>
            <h2>Investors Details</h2>
            <label>Asset Class : </label>
            <select id='select-asset' onChange={handleSelectedAssetChange}>
                <option value=''>Select</option>
                {Object.entries(ASSET_CLASSES).map(([id, label]) => (
                    <option key={id} value={id}>
                        {label}
                    </option>
                ))}
            </select>
            {isCommitmentsLoading && <Spinner />}
            {!isCommitmentsLoading && <CommitmentsTable data={commitmentsList} />}
        </Fragment>
    );
};

export default InvestorDetails;
