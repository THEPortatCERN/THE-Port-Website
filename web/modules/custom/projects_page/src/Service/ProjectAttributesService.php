<?php

namespace Drupal\projects_page\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;

class ProjectAttributesService {

  /** @var Drupal\Core\Entity\EntityTypeManagerInterface */
  protected $entity_type_manager;

  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->entity_type_manager = $entity_type_manager;
  }

  public function getAttributes() {
    $terms = $this->entity_type_manager
      ->getStorage('taxonomy_term')
      ->loadByProperties([
        'vid' => 'project_attributes',
      ]);

    $data = [];

    /** @var \Drupal\taxonomy\TermInterface $term */
    foreach ($terms as $term) {
      $data[] = [
        'id' => $term->id(),
        'name' => $term->getName()
      ];
    }

    return $data;
  }
}
