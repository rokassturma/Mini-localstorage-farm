import { useEffect, useState } from "react";
import randomNumber from './functions/randomNumber'

export default function App() {

  const [animalType, setAnimalType] = useState('');
  const [weight, setWeight] = useState('');
  const [animals, setAnimals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    if (!animalType || !weight) {
      return;
    }
    const newAnimal = {
      id: randomNumber(1, 1000),
      animalType: animalType,
      weight: weight
    }
    const updatedAnimals = [...animals, newAnimal]
    setAnimals(updatedAnimals);
    localStorage.setItem('animals', JSON.stringify(updatedAnimals));
    setAnimalType('');
    setWeight('');
  }


  const handleDelete = (id) => {
    const updatedAnimals = animals.filter(animal => animal.id !== id);
    setAnimals(updatedAnimals);
    localStorage.setItem('animals', JSON.stringify(updatedAnimals));
  }


  const handleEdit = (id) => {
    const findAnimal = animals.find(animal => animal.id === id);
    if (!findAnimal) return;
    setAnimalType(findAnimal.animalType);
    setWeight(findAnimal.weight);
    setEditingId(findAnimal.id);
  }

  const handleUpdate = () => {
    const updateAnimal = animals.map(animal => {
      if (animal.id === editingId) {
        return {
          ...animal,
          animalType: animalType,
          weight: weight
        };
      }
      return animal;
    });

    setAnimals(updateAnimal);
    localStorage.setItem('animals', JSON.stringify(updateAnimal));
    setAnimalType('');
    setWeight('');
    setEditingId(null)
  }

  useEffect(() => {
    const savedAnimals = localStorage.getItem('animals');
    if (savedAnimals) {
      setAnimals(JSON.parse(savedAnimals))
    }
  }, []);

  return (
    <>
      <h1 className="text-center mt-4 mb-4">Mini LocalStorage Farm CRUD</h1>

      <div className="container">
        <div className="row">

          {/* LEFT SIDE – form */}
          <div className="col-md-6">
            <h5 className="mb-3">Add Animal</h5>
            <div className="mb-3">
              <select className="form-select" value={animalType} onChange={e => setAnimalType(e.target.value)} aria-label="Select animal">
                <option value="">Choose an animal</option>
                <option value="Sheep 🐑">Sheep</option>
                <option value="Duck 🦆">Duck</option>
                <option value="Antelope 🦌">Antelope</option>
              </select>
            </div>
            <div className="mb-3">

              <input type="number" value={weight} className="form-control" onChange={e => setWeight(e.target.value)} placeholder="Enter weight (kg)" />
            </div>
            <div className="mb-3">
              {editingId === null ? (
                <button type="button" className="btn btn-success" onClick={handleAdd}>Add</button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save</button>
              )}
            </div>
          </div>

          {/* RIGHT SIDE – list */}
          <div className="col-md-6">
            <h5 className="mb-3">Animal List</h5>
            {
              animals.map(animal => (
                <div key={animal.id} className="card mb-2">
                  <div className="card-body">
                    <h6 className="card-title">{animal.animalType}</h6>
                    <p className="card-text">{animal.weight} kg</p>

                    <button type="button" className="btn btn-warning me-2" onClick={() => handleEdit(animal.id)}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(animal.id)}>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}
