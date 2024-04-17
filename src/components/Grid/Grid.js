import "./Grid.css";

export default function Grid() {
  return (
    <div className="grid">
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
    </div>
  );
}

function GridRow() {
  return (
    <div className="grid__row">
      <div className="grid__tile"></div>
      <div className="grid__tile"></div>
      <div className="grid__tile"></div>
      <div className="grid__tile"></div>
      <div className="grid__tile"></div>
    </div>
  );
}
