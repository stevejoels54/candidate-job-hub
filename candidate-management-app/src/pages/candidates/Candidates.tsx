import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../config/actions";
import { IState } from "../../types";

const Candidates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCandidates());
  }, [dispatch]);

  const { candidatesLoading, candidatesSuccess, candidatesError } = useSelector(
    (state: IState) => state
  );

  return (
    <div>
      <h1>Candidates</h1>
      {candidatesLoading && <p>Loading...</p>}
      {candidatesSuccess.map((candidate) => (
        <div key={candidate.id}>
          <p>{candidate.firstName}</p>
          <p>{candidate.lastName}</p>
          <p>{candidate.email}</p>
          <p>{candidate.comment}</p>
          <hr />
        </div>
      ))}
      {candidatesError && <p>{candidatesError.message}</p>}
    </div>
  );
};

export default Candidates;
