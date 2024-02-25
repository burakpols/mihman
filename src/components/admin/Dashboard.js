import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  ButtonGroup,
} from "react-bootstrap";
import menu from "../menu/data";
import axios from "axios";

const ProductTable = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({
    id: "",
    category: "",
    subcategory: "",
    title: "",
    desc: "",
    price: "",
    img: "",
  });
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleEdit = (product) => {
    setEditedProduct(product);
    setShowEditModal(true);
  };
  const handleDelete=(id)=>{
    setDeleteItemId(id)
    setShowDeleteModal(true)
  }
  const handleSaveDelete = async () => {
    console.log(deleteItemId);
    try {
      const response = await axios.post("http://localhost:3800/api/delete", {
        deleteItemId,
      });

      if (response.status === 200) {
        setDeleteItemId("")
        setShowDeleteModal(false)
        // Başarılı giriş
        console.log("done");
        // navigate('/admin/dashboard'); // navigate fonksiyonunu uygun bir şekilde kullanarak yönlendirme yapabilirsiniz
      } else {
        // Giriş başarısız, hata işleme
        throw new Error(
          "Authentication failed. Please check your credentials."
        );
        
      }
    } catch (error) {
      // Hata durumunda
      console.error("Error:", error.message);
    }
  };

  const handleSaveEdit = async () => {
    // Update the product
    console.log(editedProduct);
    try {
      const response = await axios.post("http://localhost:3800/api/update", {
        editedProduct,
      });

      if (response.status === 200) {
        // Başarılı giriş
        console.log("done");
        // navigate('/admin/dashboard'); // navigate fonksiyonunu uygun bir şekilde kullanarak yönlendirme yapabilirsiniz
      } else {
        // Giriş başarısız, hata işleme
        throw new Error(
          "Authentication failed. Please check your credentials."
        );
      }
    } catch (error) {
      // Hata durumunda
      console.error("Error:", error.message);
    }
    // onUpdate(editedProduct);
    setShowEditModal(false);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleSaveAdd = async () => {
    try {
      const response = await axios.post("http://localhost:3800/api/add", {
        newProduct,
      });

      if (response.status === 200) {
        console.log("added");
      } else {
        throw new Error(
          "Authentication failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    // Clear the form fields
    setNewProduct({
      id: "",
      category: "",
      subcategory: "",
      title: "",
      desc: "",
      price: "",
      img: "",
    });
    setShowAddModal(false);
  };

  return (
    <Container>
      <Button className="m-1" variant="success" onClick={handleAdd}>
        Yeni ürün ekle
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategori</th>
            <th>Alt Kategori</th>
            <th>İsim</th>
            <th>Açıklama</th>
            <th>Fiyat</th>
            <th>Resim</th>
            <th>Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.category}</td>
              <td>{product.subcategory}</td>
              <td>{product.title}</td>
              <td>{product.desc}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={"../."+product.img}
                  alt={product.title}
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                <ButtonGroup>
                  <Button className="m-1" variant="primary" onClick={() => handleEdit(product)}>
                    Güncelle
                  </Button>
                  <Button
                    className="m-1"
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Sil
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ürün Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                type="text"
                placeholder="İsim Gir"
                value={editedProduct.title}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategori Gir"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formSubcategory">
              <Form.Label>Alt Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alt Kategori Gir"
                value={editedProduct.subcategory}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    subcategory: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDesc">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Açıklama Gir"
                value={editedProduct.desc}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, desc: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Fiyat</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fiyat Gir"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formImg">
              <Form.Label>Resim Yolu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Resim Yolu Gir"
                value={editedProduct.img}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, img: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni ürün ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                type="text"
                placeholder="İsim Gir"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategori Gir"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formSubcategory">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alt Kategori Gir"
                value={newProduct.subcategory}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, subcategory: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDesc">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Açıklama Gir"
                value={newProduct.desc}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, desc: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Fiyat</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fiyat Gir"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formImg">
              <Form.Label>Resim Yolu</Form.Label>
              <Form.Control
                type="text"
                placeholder="./images/resim.jpg"
                value={newProduct.img}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, img: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            İptal
          </Button>
          <Button variant="primary" onClick={handleSaveAdd}>
            Ürün Ekle
          </Button>
        </Modal.Footer>
      </Modal>


       {/* delete Modal */}         
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Silme işlemini onayla</Modal.Title>
      </Modal.Header>
      <Modal.Body>Gerçekten ürünü silmek istiyor musunuz?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          İptal
        </Button>
        <Button variant="danger" onClick={handleSaveDelete}>
          Sil
        </Button>
      </Modal.Footer>
    </Modal>

      
    </Container>
  );
};

export default ProductTable;
