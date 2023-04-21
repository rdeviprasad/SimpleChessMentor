import { useRouter } from "next/router";
import SCMBoard from "../components/SCMBoard";

export default function Result() {
  const router = useRouter();
  const { fen, moves } = router.query;

  return <SCMBoard fen={fen} moves={moves} />;
}
