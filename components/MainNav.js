import Link from 'next/link';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken, isAuthenticated } from '@/lib/authenticate';

export default function MainNav() {
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const user = readToken();

  async function handleSubmit(e) {
    e.preventDefault();
    const q = searchField.trim();
    if (!q) return;
    if (isAuthenticated()) setSearchHistory(await addToHistory(`title=true&q=${q}`));
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${encodeURIComponent(q)}`);
  }

  function logout() {
    removeToken();
    setIsExpanded(false);
    router.push('/login');
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Metropolitan Museum</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated() ? (
                <>
                  <Link href="/" className="nav-link" onClick={() => setIsExpanded(false)}>Home</Link>
                  <Link href="/search" className="nav-link" onClick={() => setIsExpanded(false)}>Advanced Search</Link>
                </>
              ) : (
                <>
                  <Link href="/register" className="nav-link" onClick={() => setIsExpanded(false)}>Register</Link>
                  <Link href="/login" className="nav-link" onClick={() => setIsExpanded(false)}>Login</Link>
                </>
              )}
            </Nav>

            {isAuthenticated() && (
              <>
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <FormControl type="search" placeholder="Search" className="me-2"
                    onChange={(e) => setSearchField(e.target.value)} />
                  <Button type="submit">Search</Button>
                </Form>
                <Nav className="ms-3">
                  <NavDropdown title={user?.userName || 'User'}>
                    <Link href="/favourites" className="dropdown-item" onClick={() => setIsExpanded(false)}>Favourites</Link>
                    <Link href="/history" className="dropdown-item" onClick={() => setIsExpanded(false)}>Search History</Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  );
}
