import rawCv from "../../cv.json";
import type { Cv } from "@/types";

// cv.json is treated as data, not as a type source: casting it once here
// (instead of letting every importer infer types straight from the JSON
// literal) means adding/removing an optional field in one entry can't
// silently change the inferred type for every other file that reads this
// data - the shape is pinned by the Cv interface in @/types.
const cv = rawCv as Cv;

export const { basics, work, education, certificates, awards, skills, projects } = cv;

export default cv;
