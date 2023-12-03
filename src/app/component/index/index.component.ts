import { Component } from '@angular/core';
import { sepolia } from '@wagmi/core/chains'
import { configureChains, createConfig } from '@wagmi/core';
import { EthereumClient, w3mConnectors, w3mProvider, } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { watchAccount, watchNetwork } from '@wagmi/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndexComponent {
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

    // Listener for change network
    watchNetwork((network) => {
    
    })

    // Listener for change account
    watchAccount((connection) => {
      
    });

  }

  /**
   * Connects wallet
   */
  connectWallet() {
    this.connector.openModal();
    watchAccount((connection) => {
      
    });
  }
}
