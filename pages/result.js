import { useRouter } from "next/router";
import Board from "../components/Board";

export default function Result() {
  const router = useRouter();
  const { fen, moves } = router.query;

  return <Board fen={fen} moves={moves} />;
}
