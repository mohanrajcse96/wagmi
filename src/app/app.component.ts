import { Component } from '@angular/core';
import { sepolia } from '@wagmi/core/chains'
import { configureChains, createConfig } from '@wagmi/core';
import { EthereumClient, w3mConnectors, w3mProvider, } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { watchAccount } from '@wagmi/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wagmi';
  public connector!: Web3Modal;

/**
 * Initial Loading
 */
public ngOnInit(): void {  
  const chains = [sepolia];
    const projectId = '';

    const { publicClient } = configureChains(chains, [
      w3mProvider({ projectId }),
    ]);
    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, chains }),
      publicClient,
    });

    const ethereumClient = new EthereumClient(wagmiConfig, chains);
    this.connector = new Web3Modal(
      {
        themeVariables: {
          '--w3m-font-family': 'Overpass", sans-serif',
          '--w3m-accent-color': '#6384fa',
          '--w3m-text-medium-regular-size': '13px',
        },
        projectId,
      },
      ethereumClient
    );

  }

  /**
   * Connects wallet
   */
  async connectWallet() {
    this.connector.openModal();
    watchAccount((connection) => {
      
    });
  }
}


// Install

// npm install @web3modal/wagmi @wagmi/core viem
// npm i @web3modal/ethereum
// npm i @web3modal/html