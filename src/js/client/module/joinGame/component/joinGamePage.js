import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class JoinGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      joinedGame: undefined,
    };
    this.updateGames = this.updateGames.bind(this);
    this.getAllGames = this.getAllGames.bind(this);
    this.renderGames = this.renderGames.bind(this);
  }

  componentWillMount() {
    const { networkManager } = this.props;
    networkManager.unregisterAllGamesReceived();
  }

  componentDidMount() {
    const { networkManager } = this.props;
    networkManager.registerAllGamesReceived(this.updateGames);
    this.getAllGames();
  }

  getAllGames() {
    const { networkManager } = this.props;
    networkManager.getAllGames();
  }

  updateGames(games) {
    this.setState({ games: Object.keys(games) });
  }

  joinGame(game) {
    const { networkManager } = this.props;
    networkManager.joinGame(game);
    this.setState({ joinedGame: game });
  }

  renderGames() {
    const { games } = this.state;
    return games.map(g => (
      <div key={g} onClick={() => this.joinGame(g)} role="button">
        {g}
      </div>
    ));
  }

  render() {
    const { joinedGame } = this.state;
    if (joinedGame) {
      return <Redirect to={`/lobby/${joinedGame}`} />;
    }
    return (
      <div>
        <div>{this.renderGames()}</div>
        <input type="button" value="Refresh" onClick={this.getAllGames} />
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

export default JoinGamePage;
