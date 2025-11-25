# souv-components

## Nova funcionalidade: Adicionar apps personalizados na grid

Agora você pode incluir aplicativos extras na grid de forma simples e flexível usando a propriedade `extraApps`.

### Propriedades adicionadas

| Propriedade       | Tipo                  | Obrigatório | Descrição                                                                 |
|-------------------|-----------------------|-------------|---------------------------------------------------------------------------|
| `extraApps`       | `AppItem[]`           | Não         | Lista de aplicativos extras para exibir na grid                           |
| `openNewTab`      | `boolean`             | Não         | Se `true`, o link do app será aberto em uma nova aba (padrão: `false`)    |
| `showVisaonApp`   | `boolean`             | Não         | Se `true`, exibe o app "Visão" na grid (padrão: `false`)                  |

### Interface AppItem

```typescript
interface AppItem {
  value: string;         // Identificador único do app
  label: string;         // Nome que aparece no card
  link: string;          // URL para onde o app será redirecionado
  icon?: React.ReactNode; // Ícone personalizado (opcional)
  avatar?: React.ReactNode; // Avatar personalizado (opcional)
  visible?: boolean;     // Controla se o app aparece ou não (padrão: true)
}