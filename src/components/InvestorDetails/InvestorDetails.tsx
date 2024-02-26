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
    const [isCommitmentsLoading, setIsCommitmentsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchCommitmentDetails = (selectedAsset: string) => {
        if (selectedAsset?.length && investorId?.length) {
            setIsError(false);
            setIsCommitmentsLoading(true);
            investorsServiceManager
                .getCommitments({ asset_class: selectedAsset, investor_id: parseInt(investorId) })
                .then((commitmentsData) => {
                    setCommitmentsList(commitmentsData);
                })
                .catch((error) => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsCommitmentsLoading(false);
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
            <label>
                {'Asset Class :'}
                <select id='select-asset' onChange={handleSelectedAssetChange}>
                    <option value=''>Select</option>
                    {Object.entries(ASSET_CLASSES).map(([id, label]) => (
                        <option key={id} value={id}>
                            {label}
                        </option>
                    ))}
                </select>
            </label>
            {isCommitmentsLoading && <Spinner />}
            {!isCommitmentsLoading && !isError && commitmentsList?.length !== 0 && (
                <CommitmentsTable data={commitmentsList} />
            )}
            {isError && (
                <p>Some error occurred while fetching the commitment details. Please try again after some time.</p>
            )}
        </Fragment>
    );
};

export default InvestorDetails;
