import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../config/actions";
import { IState } from "../../types";
import { CandidatesTable } from "../../components/common/CandidatesTable";
import { FloatButton } from "antd";
import { TbReload } from "react-icons/tb";
import AddCandidate from "../../components/candidate/Forms/AddCandidate";
import UpdateCandidate from "../../components/candidate/Forms/UpdateCandidate";
import CandidateDetails from "../../components/candidate/Details/CadidateDetails";
import { isEmpty } from "lodash";

const Candidates = () => {
  const dispatch = useDispatch();

  const { candidatesLoading, candidatesSuccess, candidatesError } = useSelector(
    (state: IState) => state.candidate
  );

  useEffect(() => {
    isEmpty(candidatesSuccess) && dispatch(actions.getCandidates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to reload get candidates
  const reloadCandidates = () => {
    dispatch(actions.getCandidates());
  };

  return (
    <div>
      <h1>Candidates</h1>
      <AddCandidate />
      <UpdateCandidate />
      <CandidateDetails />
      {candidatesError && <p>{candidatesError.message}</p>}
      <CandidatesTable data={candidatesSuccess} loarding={candidatesLoading} />
      <FloatButton
        icon={<TbReload />}
        onClick={reloadCandidates}
        type="primary"
      />
    </div>
  );
};

export default Candidates;
