import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null; // wait for RouteGuard

  if (favouritesList.length === 0) {
    return <Card><Card.Body>Nothing Here. Try adding some new artwork.</Card.Body></Card>;
  }
  return (
    <Row className="gy-4">
      {favouritesList.map(objectID => (
        <Col lg={3} key={objectID}>
          <ArtworkCard objectID={objectID} />
        </Col>
      ))}
    </Row>
  );
}
