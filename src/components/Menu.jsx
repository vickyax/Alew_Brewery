import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Pagination } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import "../styles/Menu.css"; // Add your custom CSS for better styling
import StarRating from "./StarRating";
import Navbar from "./Navbar";

function Menu() {
  const [beers, setBeers] = useState([]);
  const [validBeers, setValidBeers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debounce search input to improve performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce delay
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch beer data
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/beers/ale");
        const data = await response.json();
        setBeers(data);
        await checkImageSizes(data); // Check image sizes after fetching
      } catch (error) {
        console.error("Error fetching beers:", error);
      }
    };
    fetchBeers();
  }, []);

  // Function to check image size validity
  const checkImageSize = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img.width > 0 && img.height > 0);
      img.onerror = () => resolve(false);
    });
  };

  // Parallelize image validation
  const checkImageSizes = async (beers) => {
    const results = await Promise.allSettled(
      beers.map(async (beer) => {
        const isValid = await checkImageSize(beer.image);
        return isValid ? beer : null;
      })
    );
    setValidBeers(
      results
        .filter(({ status, value }) => status === "fulfilled" && value !== null)
        .map(({ value }) => value)
    );
  };

  // Filter beers based on debounced search query
  const filteredBeers = validBeers.filter((beer) =>
    beer.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  // Paginate the filtered beers
  const paginatedBeers = filteredBeers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <Container>
        {/* Search Bar */}
        <Row className="mt-4">
          <Col xs={12} className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search for a beer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>

        {/* Beer List */}
        <Row className="mt-2">
          {paginatedBeers.length > 0 ? (
            paginatedBeers.map((beer) => (
              <Col key={beer.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="beer-card">
                  <LazyLoad height={200} offset={100}>
                    <Card.Img
                      variant="top"
                      src={beer.image}
                      alt={`Image of ${beer.name}`}
                    />
                  </LazyLoad>
                  <Card.Body>
                    <Card.Title>{beer.name}</Card.Title>
                    <Card.Text className="beer-price">{beer.price || "N/A"}</Card.Text>
                    <Card.Text className="beer-rating">
                      <strong>
                        {beer.rating.average?.toFixed(2) || "No Rating"}
                      </strong>{" "}
                      <StarRating rating={beer.rating.average?.toFixed(2) || 0} /> (
                      {beer.rating.reviews || 0} reviews)
                    </Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p>No beers found matching your search query.</p>
            </Col>
          )}
        </Row>

        {/* Pagination */}
        <Row className="mt-4">
  <Col xs={12}>
    <Pagination>
      {[...Array(Math.ceil(filteredBeers.length / itemsPerPage))].map((_, idx) => (
        <Pagination.Item
          key={idx + 1}
          active={idx + 1 === currentPage}
          onClick={() => handlePageChange(idx + 1)}
          style={{
            backgroundColor: idx + 1 === currentPage ? "#28a745" : "transparent", // Active green background
        color: idx + 1 === currentPage ? "#fff" : "#ffc107", // Inactive yellow text
        border: idx + 1 === currentPage ? "1px solid #28a745" : "1px solid #ffc107",
        cursor: "pointer",
        display: "inline-block",
        margin: "5px",
        padding: "5px 10px",
        borderRadius: "5px",
        fontSize:"20px"
          }}
          className={idx + 1 === currentPage ? "active-page" : "inactive-page"}
        >
          {idx + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  </Col>
</Row>
      </Container>
    </>
  );
}

export default Menu;
