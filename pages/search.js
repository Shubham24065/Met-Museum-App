import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';

export default function AdvancedSearch() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(data) {
    let queryString = `searchBy=${data.searchBy}`;
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView || false}`;
    queryString += `&isHighlight=${data.isHighlight || false}`;
    queryString += `&title=${data.title || ''}`;
    queryString += `&q=${data.q || ''}`;

    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col md>
          <Form.Group className="mb-3">
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register('searchBy')}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" {...register('geoLocation')} />
            <Form.Text className="text-muted">Case sensitive (e.g., "Europe", "France")</Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" {...register('medium')} />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" {...register('title')} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="On View" {...register('isOnView')} />
            <Form.Check type="checkbox" label="Highlighted" {...register('isHighlight')} />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className="mb-3">
            <Form.Label>Keywords</Form.Label>
            <Form.Control type="text" {...register('q')} />
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit">Search</Button>
    </Form>
  );
}
