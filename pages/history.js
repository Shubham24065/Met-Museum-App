import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { ListGroup, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  if (!searchHistory) return null; // wait for RouteGuard

  const parsedHistory = searchHistory.map((h) => {
    const params = new URLSearchParams(h);
    return Object.fromEntries(params.entries());
  });

  function historyClicked(e, index) {
    e.stopPropagation();
    const queryString = searchHistory[index];
    router.push(`/artwork?${queryString}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    const value = searchHistory[index];
    setSearchHistory(await removeFromHistory(value));
  }

  return (
    <ListGroup>
      {parsedHistory.map((item, index) => (
        <ListGroup.Item key={index} className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
          {Object.keys(item).map((key) => (
            <span key={key}>{key}: <strong>{item[key]}</strong>&nbsp;</span>
          ))}
          <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
