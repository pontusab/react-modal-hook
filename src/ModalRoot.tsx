import React, { memo } from "react";
import ReactDOM from "react-dom";
import { ModalType } from "./ModalContext";

/**
 * Modal Root Props
 */
interface ModalRootProps {
  /**
   * Map of modal instances associated by unique ids
   */
  modals: Record<string, ModalType>;

  /**
   * Container component for modals
   *
   * Modals will be rendered as children of this component. React.Fragment is
   * used by defualt, specifying a different component can change the way modals
   * are rendered across the whole application.
   */
  container?: React.ComponentType<any>;
}

/**
 * Modal Root
 *
 * Renders modals using react portal.
 */
export const ModalRoot = memo(
  ({ modals, container: Container = React.Fragment }: ModalRootProps) => {
    return ReactDOM.createPortal(
      <Container>
        {Object.keys(modals).map(key => {
          const Component = modals[key];

          return <Component key={key} />;
        })}
      </Container>,
      typeof document !== 'undefined' && document.body
    );
  }
);
