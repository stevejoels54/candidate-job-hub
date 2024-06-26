import SqlDataAccess from "../dataAccess/sqlDataAccess";
import NoSqlDataAccess from "../dataAccess/noSqlDataAccess";
import CandidateService from "./candidateService";

const loadCandidateService = (): CandidateService => {
  const databaseType = process.env.DATABASE_TYPE;

  let dataAccess;

  if (databaseType === "SQL") {
    dataAccess = new SqlDataAccess();
  } else if (databaseType === "NoSQL") {
    dataAccess = new NoSqlDataAccess();
  } else {
    throw new Error("DATABASE_TYPE environment variable is not set correctly");
  }

  return new CandidateService(dataAccess);
};

export default loadCandidateService;
